function logConsole({ file, status, data, local }) {
  const isLocal = local === true ? "LOCAL" : "EXTERNAL";
  const statusMessage =
    status === "error" ? "Request failed" : "Request succeeded";
  const addData = status === "error" ? `${data}` : "Success";
  console[status === "error" ? "warn" : "log"](
    `[${isLocal}](Codename: ${mapName}) ${statusMessage} for ${file}: ${addData}`
  );
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseText(response) {
  return response.text();
}

let creatorName;
function setCreator(name) {
  creatorName = name;
}

function getCreator() {
  return creatorName;
}

function innerHTML({ id, data, name }) {
  const isCreator = name === "creator" ? true : false;
  const container = document.getElementById(id);
  const dataArray = data.split("\n").filter(Boolean);
  const limitedArray = dataArray.slice(0, 10);

  const paragraphs = limitedArray.map((nickname) => {
    let name;
    if (isCreator) {
      setCreator(nickname);
      name = `
          <span class="inline-flex items-center rounded-md bg-indigo-800 
          px-2 py-1 text-sm text-indigo-200 ring-1 ring-inset 
          ring-indigo-700/10" title="Creator">
          ${nickname}
          </span>
      `;
    } else {
      const creator = getCreator();
      if (nickname != creator) {
        name = `<p>${nickname}</p>`;
      }
    }
    return name;
  });

  container.innerHTML = paragraphs.join("");
}

const fetchDataRank = async ({ name }) => {
  const url = "./" + file[name];
  try {
    const response = await fetch(url);
    const data = await checkStatus(response).then(parseText);

    logConsole({
      file: file[name],
      status: "success",
      data: data,
      local: true,
    });

    innerHTML({ id: id[name], data: data, name: name });
  } catch (error) {
    logConsole({
      file: file[name],
      status: "error",
      data: error,
      local: true,
    });
    innerHTML({ id: id[name], data: error });
  }
};
