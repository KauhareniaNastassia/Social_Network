export const updateObjectInArray = (items: any, itemId: string, objPropName: any, newObjProps: any) => {
    return items.map((item: { [x: string]: string }) => {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item
    })
}