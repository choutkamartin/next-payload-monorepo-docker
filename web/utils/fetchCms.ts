const fetchCms = async (url: string) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}${url}`).then(
      (res) => res.json()
    );
    return data;
  } catch (error) {
    console.log("There was an error", error);
  }
};

export default fetchCms;
