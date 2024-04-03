
export function handleActiveOption(path,location) {
        return `${location.pathname.includes(path)?'bg-gray-100 dark:bg-gray-700':''}`
}