/// <reference types="svelte" />

interface IRoute {
    controller: typeof SvelteComponentDev
}

interface IDropdownLinks {
    text?: string
    divider?: boolean
    handleClick?: () => void
    label?: string
    to?: string
}
