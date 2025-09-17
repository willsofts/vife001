export function validJSON(value) {
    try { 
        if(value && value.trim().length > 0) {
            JSON.parse(value);
        }
    } catch(ex) { return false; }
    return true;
}
export function validJSONArray(value) {
    try { 
        if(value && value.trim().length > 0) {
            let json = JSON.parse(value);
            return Array.isArray(json);
        }
    } catch(ex) { return false; }
    return true;
}
