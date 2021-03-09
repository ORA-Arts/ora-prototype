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

export const fetchGalleryName = async () => {
    const res = await axios.get('/api/gallery/profile/name');
    return res.data;
};

export const addNewGallery = async (dataForm) => {
    const res = await axios.post('/api/gallery/profile',
        dataForm, config
    );

    return res.data;
};

export const editGallery = async (dataForm) => {
    const res = await axios.put('/api/gallery/profile',
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
    const res = await axios.post('/api/gallery/inventory/new',
        dataForm, config
    );
    return res.data;
};


export const editArtWork = async (artworkId, dataForm) => {
    const res = await axios.put(`/api/gallery/inventory/${artworkId}`,
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

export const editArtist = async (artistId, dataForm) => {
    const res = await axios.put(`/api/gallery/artists/${artistId}`,
        dataForm, config
    );
    return res.data;
};

export const fetchArtistById = async (artistId) => {
    const res = await axios.get(`/api/gallery/artists/${artistId}`);
    return res.data;
};

export const fetchArtworkById = async (artworkId) => {
    const res = await axios.get(`/api/gallery/inventory/${artworkId}`);
    return res.data;
};


