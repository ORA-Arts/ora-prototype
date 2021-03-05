import axios from "axios";

export const fetchGallery = async () => {
    const res = await axios.get('/api/gallery');
    return res.data;
};

export const addNewGallery = async (dataForm) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const res = await axios.post('/api/gallery',
        dataForm, config
    );

    return res.data;
};
