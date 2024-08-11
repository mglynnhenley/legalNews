export async function getPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/list");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signUpToNewsletter(email: string) {
  try {
    const response = await fetch("http://localhost:3000/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), 
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error("Request failed with status:", response.status);
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}
