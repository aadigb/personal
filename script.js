body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    margin: 0;
    font-family: Arial, sans-serif;
}

#container {
    text-align: center;
}

.cool-font {
    font-family: 'Impact', 'Charcoal', sans-serif;
    font-size: 72px;
    color: #000000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
}

.image-container {
    display: inline-block;
    padding: 10px;
    background-color: #000000;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
}

.image-container img {
    display: block;
    margin: 0 auto;
    width: 300px;
    height: auto;
    border-radius: 8px;
}

#heart-button {
    display: block;
    margin: 20px auto 0; /* Center the button and add margin at the top */
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4169e1; /* Royal blue color */
    color: #fff;
    border: none;
    border-radius: 25px; /* Rounded edges */
    cursor: pointer;
    transition: background-color 0.3s;
}

#heart-button:hover {
    background-color: #27408b; /* Darker royal blue on hover */
}

.heart {
    position: absolute;
    font-size: 24px;
    color: red;
    animation: rise 1s ease-in-out;
}

@keyframes rise {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-100px);
    }
}

/* Rain Effect */
.rain {
    position: absolute;
    width: 2px;
    height: 10px;
    background: rgba(0, 0, 255, 0.5);
    bottom: 100%;
    animation: fall linear infinite;
}

@keyframes fall {
    to {
        transform: translateY(100vh);
    }
}
