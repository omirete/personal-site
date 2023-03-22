const getMissingProperties = (
    obj: Record<string, any>,
    acceptNull: boolean = false
): string[] => {
    let missingProperties: string[] = [];
    Object.entries(obj).forEach(([key, val]) => {
        if (
            val === undefined ||
            val === "" ||
            (val === null && !acceptNull === true)
        ) {
            missingProperties.push(key);
        }
    });
    return missingProperties;
};

export default getMissingProperties;
