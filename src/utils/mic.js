import Dexie from 'dexie'
const db = new Dexie('table_mics');
db.version(1).stores({
  friends: '++id, url, path, name, system'
})
const add = async (params) => {
  console.log(params);
  const res = await db.friends.add(params)
  if (res) {
    return res
  }
}
const get = async (key) => {
  const res = await db.friends.get(key)
  if (res) {
    return res
  }
}












export { get, add }
