export const updateObjectInArray = <A, I, N>(items: Array<A>, itemId: I, objPropName: string, newObjProps: N): Array<A> => {

    return items.map((u:any) => {
        if (u[objPropName] === itemId){
            return {...u, ...newObjProps}
        }
        return u
    })
}