// src/colors.js
export const softColors = [
  
    '#e0f7fa', // Light Cyan
    '#b3e5fc', // Light Sky Blue
    '#bbdefb', // Light Blue
    '#cce0f5', // Pale Blue
    '#e1f5fe', // Light Pale Blue
    '#b2ebf2', // Light Turquoise
    '#c5cae9', // Light Periwinkle
    '#d0d8e8', // Soft Blue Gray
    '#e8f5e9', // Pale Greenish Blue
    '#e0eafc', // Very Soft Blue
    '#c8e6c9', // Light Mint
    '#b9f6ca', // Light Lime Green
    '#e8f5e9', // Pale Green
    '#dcedc8', // Light Pale Green
    '#e0f2e7', // Soft Mint Green
    '#ccff90', // Bright Light Lime
    '#d1f2eb', // Soft Teal Green
    '#e6f4ea', // Very Soft Green
    '#edf7f6', // Light Pale Mint
    '#f0f9f3', // Extremely Soft Green
    '#d1c4e9', // Light Purple
    '#e1bee7', // Light Lavender
    '#f3e5f5', // Pale Purple
    '#ede7f6', // Very Soft Lavender
    '#f8bbd0', // Light Rose Pink
    '#fce4ec', // Light Pink
    '#f5f0f6', // Very Pale Purple
    '#f3e5f5', // Pale Lilac
    '#fce4ec', // Pastel Pink
    '#fbe9e7', // Light Coral Pink
    '#fff8e1', // Light Yellow
    '#fff3e0', // Light Pale Yellow
    '#ffe0b2', // Light Amber
    '#ffcc80', // Light Orange
    '#fff9c4', // Very Light Yellow
    '#ffecb3', // Light Pale Golden
    '#fffde7', // Almost White Yellow
    '#ffebc1', // Soft Light Orange
    '#fff8e1', // Light Cream
    '#fff9e6', // Very Pale Orange
    '#f5f5f5', // Very Light Gray
    '#f0ece2', // Light Beige
    '#efebe9', // Pale Gray Brown
    '#e0e0e0', // Light Gray
    '#d7ccc8', // Light Brown
    '#ffebee', // Light Rose
    '#fbe9e7', // Light Peach
    '#f9f5e7', // Light Sand
    '#f5f5f0', // Very Light Off White
    '#f0ead6', // Soft Buff

  ];
  
  export const getRandomColor = () => {
    return softColors[Math.floor(Math.random() * softColors.length)];
  };