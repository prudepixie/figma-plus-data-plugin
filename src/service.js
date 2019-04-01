export const getContentTypeData = async (id, num) => {
  let arr = id.split("");
  arr.shift();
  let dataType = arr.join("");

  if (id === "#countries" || id === "#addresses") {
    dataType = "location";
  } else if (id === "#usernames") {
    dataType = "login";
  }

  const url = `https://randomuser.me/api/?inc=${dataType}&results=${num}`;
  const data = await getData(url);
  return data.results;
};

const getData = async url => {
  let payload;
  try {
    const res = await fetch(url);
    payload = await res.json();
  } catch (e) {
    payload = { error: true, message: e };
  }

  return payload;
};
