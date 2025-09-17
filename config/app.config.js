const appVariables = {
    MULTI_LANGUAGES: ["EN","TH"],
    BASE_CSS: "./css/theme_green_sea.css",
    API_URL: "http://127.0.0.1:8080",
    BASE_URL: "http://127.0.0.1:8080",
    API_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiY2FlMmIxM2MtMmQyYi00MjEwLTllYjUtNTc5OGM1ODA2NWUwIiwic2l0ZSI6IkZXUyIsImFjY2Vzc29yIjoidHNvIiwidHlwZSI6IkciLCJpYXQiOjE3NDAzNjQzMzIsImV4cCI6MjIxODc2ODUwNzMyfQ.W8JGCNfLehUiQBh7_gviOWhOG-mnb9n1f_S9gEvUSmk"
};
function getAppConfigs() {
    return appVariables;
}
function getAppConfig(key) {
    return appVariables[key];
}
console.log("appVariables",appVariables);
