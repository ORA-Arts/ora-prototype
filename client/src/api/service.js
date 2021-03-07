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

export const fetchArtworks = async () => {
    const res = await axios.get('/api/gallery/inventory');
    const data = res.data.map(artwork => {
        // get only the first inventory image
        artwork.imageUrl = artwork.images[0].imageUrl;
        artwork.imgPublicId = artwork.images[0].imgPublicId;
        return artwork;
    });
    return data;
}
