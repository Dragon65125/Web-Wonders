import axios from "axios";

export async function initializeKhaltiPayment({
    return_url,
    website_url,
    amount,
    purchase_order_id,
    purchase_order_name,
}: any) {
    try {
        const headersList = {
            Authorization: `Key f276b4ff2cec4eed854e10729c6d10d9`,
            "Content-Type": "application/json",
        };

        const bodyContent = JSON.stringify({
            return_url,
            website_url,
            amount,
            purchase_order_id,
            purchase_order_name,
        });

        const reqOptions = {
            url: `https://a.khalti.com/api/v2/epayment/initiate/`,
            method: "POST",
            headers: headersList,
            data: bodyContent,
        };

        const response = await axios.request(reqOptions);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

