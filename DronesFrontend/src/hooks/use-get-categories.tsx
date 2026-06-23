import { useEffect, useState } from "react"
import { Category } from "../shared/types"
import { HREF } from "../shared/api"

interface UseGetCategoriesContract {
    isLoading: boolean
    categories: Category[]
    error: string | null
}

export function useGetCategories(): UseGetCategoriesContract {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        async function getCategories() {
            try {
                setIsLoading(true)
                const response = await fetch(`${HREF}/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const json = await response.json()
                
                const data = json?.data?.categories || []
                setCategories(data)

            } catch (error) {
                console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getCategories()
    }, [])

    return { categories, isLoading, error }
}