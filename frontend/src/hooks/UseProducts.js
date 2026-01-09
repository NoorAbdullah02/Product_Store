import { createProduct, getAllProducts } from "../lib/api"
import { useMutation, useQuery } from "@tanstack/react-query"


// for get request
export const useProducts = () => {

    const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts })
    return result;

}

//for post request
export const useCreateProducts = () => {
    const result = useMutation({ mutationFn: createProduct })
    return result;
}

