export default eventHandler(async (event) => {
    const {title} = await readBody(event)
    return db.select().from(tables.kb);
})
