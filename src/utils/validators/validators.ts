export const required = (value: string) => value ? undefined : 'Field is required!!!'

export const maxLength = (length: number) => (value: string) => value.length > length
    ? `Max length is ${length} symbols`
    : undefined