import axios from "axios";

export const fetchGallery = async () => {
    const res = await axios.get('/api/gallery/profile');
    return res.data;
};

export const addNewGallery = async (dataForm) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const res = await axios.post('/api/gallery/profile',
        dataForm, config
    );

    return res.data;
};
