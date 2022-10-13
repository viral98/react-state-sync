interface FetchProps {
  url: string
  method: "GET" | "POST" | "DELETE" | "PATCH"
  header?:{
    tokenKey: string
    token: string
  }
}

const api = async ({header, url, method}:FetchProps) => {

  //TODO: Generate options object based on whether headers are passed
    const response = await fetch(url, {
        method: method,
    });

    return response;
};

export default api
