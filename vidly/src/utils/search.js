export function search(token, iter) {
    const re = new RegExp(`${token}`, "i");
    const searched = iter.filter((el) => re.test(el.title));
    return searched;
}
