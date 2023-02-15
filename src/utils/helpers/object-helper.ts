export const updateObjectInArray = (items: any, itemId: number, objPropName: any, newObjProps: any) => {
    return items.map((item: { [x: string]: number }) => {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item
    })
}