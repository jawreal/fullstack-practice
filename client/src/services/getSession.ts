interface JsonType {
  authenticated?: boolean;
}

export const getSession = async (): Promise<JsonType> => {
  try {
    const res = await fetch('http://localhost:3000/server/api/auth-check', {
      credentials: 'include', 
    });
    const jsonData: JsonType = await res.json();
    return jsonData;
  }catch(err){
    console.log("Error fetching", err)
    return { authenticated: false } 
  }
}