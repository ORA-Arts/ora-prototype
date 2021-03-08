import axios from "axios";

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

export const fetchGallery = async () => {
    const res = await axios.get('/api/gallery/profile');
    return res.data;
};

export const addNewGallery = async (dataForm) => {
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
};

export const addNewArtWork = async (dataForm) => {
    const res = await axios.post('/api/gallery/inventory/test',
        dataForm, config
    );
    return res.data;
};


// handle artists api
export const fetchArtist = async () => {
    const res = await axios.get('/api/gallery/artists');
    return res.data;
};

export const addNewArtist = async (dataForm) => {
    const res = await axios.post('/api/gallery/artists',
        dataForm, config
    );

    return res.data;
};
