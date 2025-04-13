export default function decodeJWT(token : string) {
    try {
        const base64Url = token.split(".")[1]; // Extraire le payload
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        return JSON.parse(jsonPayload); // Convertir en objet JavaScript
    } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        return null;
    }
}

