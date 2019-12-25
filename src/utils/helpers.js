export function formatDate (timestamp) {
  const d = new Date(timestamp)
  var options = { year: "numeric", month: "long",  
    day: "numeric" };

  return d.toLocaleDateString("en-US", options)
}

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
