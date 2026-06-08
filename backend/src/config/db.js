const mongoose = require("mongoose");
const dns = require("dns");


try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("Warning: Could not set custom DNS servers:", dnsErr.message);
}

// Global monkeypatch for dns.lookup: Node's internal socket connection routines use 
// dns.lookup (which calls OS getaddrinfo and ignores dns.setServers). Intercepting this 
// ensures individual shard connections (e.g. *.mongodb.net) fall back to Google DNS 
// if the default system DNS fails with ENOTFOUND/refusal.
const originalLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  
  originalLookup(hostname, options, (err, address, family) => {
    if (err && (err.code === "ENOTFOUND" || err.code === "ECONNREFUSED") && hostname.endsWith("mongodb.net")) {
      dns.resolve4(hostname, (fallbackErr, addresses) => {
        if (!fallbackErr && addresses && addresses.length > 0) {
          callback(null, addresses[0], 4);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err, address, family);
    }
  });
};

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed!");
    console.error("Error Message:", error.message);
    console.error("\n--- Troubleshooting Tips ---");
    console.error("1. Ensure your MongoDB Atlas cluster is not paused (M0 clusters automatically pause after inactivity).");
    console.error("2. Double-check your MONGO_URI in .env for any typos in the hostname.");
    console.error("3. Make sure your IP address is whitelisted in MongoDB Atlas Network Access (allow 0.0.0.0/0 for testing).");
    console.error("----------------------------\n");
    process.exit(1);
  }
};

module.exports = connectDb;