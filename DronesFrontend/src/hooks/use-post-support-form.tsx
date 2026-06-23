import { Support } from "../shared/types"
import { HREF } from '../shared'

export function usePostSupportForm() {
    async function sendSupportRequest(formData: Support) {
        try {
            await fetch(`${HREF}/support`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return { sendSupportRequest }
}