export interface ToastPreset {
    color: 'green' | 'red'
    icon: 'toast-success' | 'toast-error'
    title: 'Success' | 'Error'
}


export const toastPresets: {
    success: ToastPreset
    error: ToastPreset
} = {
    success: {
        color: 'green',
        icon: 'toast-success',
        title: 'Success'
    },
    error: {
        color: 'red',
        icon: 'toast-error',
        title: 'Error'
    }
}