import { ICheckout } from "types/ICheckout.type";

export const postCheckout = async (data: ICheckout): Promise<any> => {
    const dataCheckout = JSON.stringify(data);
    console.log(dataCheckout);
    
    const response = await fetch(`/api/checkout`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: dataCheckout,
    });
    
    return await response.json();
    };
    