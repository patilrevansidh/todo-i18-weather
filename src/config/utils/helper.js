import uniqid from "uniqid";

const store = {
  local: navigator.language,
  todos: [],
};

export function addTodos(todo) {
  const data = getDataFromStorage();
  data.todos.push({ ...todo, id: uniqid() });
  storeData(data);
}

export function storeData(data) {
  localStorage.setItem("store", JSON.stringify(data));
}

export function getDataFromStorage() {
  const storage = localStorage.getItem("store") || JSON.stringify(store);
  return JSON.parse(storage);
}

export function getTodoList() {
  const data = getDataFromStorage();
  return data.todos || [];
}

export function downloadToExcel(list) {
  const data = list;
  const fileName = "download";
  const exportType = "xls";
  window.exportFromJSON({ data, fileName, exportType });
}

export function updateTodos(item) {
  const store = getDataFromStorage();
  const todos = getTodoList().map((d) => {
    if (d.id === item.id) {
      return item;
    }
    return d;
  });
  storeData({ ...store, todos });
}

export function getMyLatLong() {
  return new Promise((resolve, reject) => {
    const onSuccess = (position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      resolve({ latitude, longitude });
    };
    const onError = (error) => {
      console.log("Error", error);
      reject(error);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      timeout: 3000,
    });
  });
}

export function deleteTodo(item) {
  const store = getDataFromStorage();
  const todos = item ? getTodoList().filter((d) => d.id !== item.id) : [];
  storeData({ ...store, todos });
}
