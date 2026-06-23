import { HREF } from '../shared'

export function useRecovery() {
    async function send(email: string) {
        try {
            console.log(JSON.stringify(email))
            let zapros = await fetch(`${HREF}/users/recovery`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            })
            let data = zapros.json()

            console.log(data)
            if('success' in data){
                return data.success
            }
            return 
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return { send }
}