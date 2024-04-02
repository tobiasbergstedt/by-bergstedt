function fixUrl(url: string): string {
  // Use the same port as you do in the server file
  if (import.meta.env.MODE === 'development') {
    console.log(`DEV MODE: ${url}`);
    return `http://localhost:1337${url}`;
  } else {
    console.log('PRODUCTION MODE');
    return `https://by-bergstedt-api-production.up.railway.app${url}`;
  }
}

export default fixUrl;
