import React, { useEffect, useState } from "react";
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {

    const [movieList, setMovieList] = useState([]);
    
    // New Movies States
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
    
    // Updated Title State
    const [updatedTitle, setUpdatedTitle] = useState("");
    
    // File Upload State
    const [fileUpload, setFileUpload] = useState(null);

    const moviesCollectionRef = collection(db, "movies");

    const getMovieList = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMovieList(filteredData);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteMovie = async (id) => {
        try{
            const movieDoc = doc(db, "movies", id);
            await deleteDoc(movieDoc);
            // getMovieList();
        }
        catch (err){
            console.log(err);
        }
    }

    const updateMovieTitle = async (id) => {
        try{
            const movieDoc = doc(db, "movies", id);
            await updateDoc(movieDoc, {
                title: updatedTitle,
            });
            // getMovieList();
        }
        catch (err){
            console.log(err);
        }
    }

    const uploadFile = async () => {
        if(!uploadFile) return;
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
        try{
            await uploadBytes(filesFolderRef, fileUpload);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getMovieList();
    });
    
    const onSubmitMovie = async () => {
        try{
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                receivedAnOscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid,
            });
            getMovieList();
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <div className="App">
            <Auth />
            <div className="movieForm">
                <input placeholder="Movie Title..." onChange={(e) => setNewMovieTitle(e.target.value)} />
                <input type="number" placeholder="Release Date..." onChange={(e) => setNewReleaseDate(e.target.value)} />
                <span>
                    <input id="oscar" type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
                    <label htmlFor="oscar">Received a Oscar</label>
                </span>
                <button onClick={onSubmitMovie}>Submit Movie</button>
            </div>
            <div>
                {movieList.map((movie) => (
                    <div style={{textAlign: "center", marginBottom: "20px"}}>
                        <h1 style={{color:movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
                        <p>{movie.releaseDate}</p>
                        <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
                        <input type="text" placeholder="New Title..." onChange={(e) => setUpdatedTitle(e.target.value)} />
                        <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
                    </div>
                ))}
            </div>
            <div>
                <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
                <button onClick={uploadFile}>Upload File</button>
            </div>
        </div>
    );
}

export default App;
