import { HREF } from '../shared'

export function useRecoveryCode() {
    async function send(code: number, password: string) {
        try {
            console.log(123123123, password, code)

            let zapros = await fetch(`${HREF}/users/recovery/${code}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password})
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