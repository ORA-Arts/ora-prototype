import axios from "axios";

export const fetchGallery = async () => {
    return await axios.get('/api/gallery');
};
