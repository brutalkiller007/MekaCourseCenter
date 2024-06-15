export default function Get_Avg_Rating(rating_arr) {
    if (!rating_arr || rating_arr.length === 0) 
        return 0;
  
    const total_rating = rating_arr.reduce((acc, curr) => acc + curr.rating, 0);
  
    const avg_rating = (total_rating / rating_arr.length);
  
    return parseFloat(avg_rating.toFixed(1));
}