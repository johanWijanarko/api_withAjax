$('.search-button').on('click', function (){
    $.ajax({
//         disni temen2 harus punya key dan ganti http://www.omdbapi.com/?apikey== dengan key temen2
        url    : 'http://www.omdbapi.com/?apikey==' + $('.input-keyword').val(),
        success: results => {  
            let movies = results.Search;
            let cards = '';   
            movies.forEach(m=> {
                cards +=showCards(m);
            });
    
            $('.movie-container').html(cards);
    
            $('.modal-detail-button').on('click', function () {
                // console.log($(this).data('imdbid'));
                $.ajax ({
//                      disni juga temen2 harus punya key dan ganti http://www.omdbapi.com/?apikey== dengan key temen2
                    url:'http://www.omdbapi.com/?apikey==' + $(this).data('imdbid'),
                    success : m => {
                        const movieDetail = showMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
           
        },
        error: (e) => {
            console.log(e.responseText);
        }
    
    });

});

function showCards(m){
    return `
    <div class="col-md-4 my-3">
        <div class="card" >
            <img src="${m.Poster}" class="card-img-top" >
            <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">show details</a>
            </div>
        </div>
    </div>`;
}

function showMovieDetail(m){
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">                    
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">${m.Title} (${m.Year})</li>
                <li class="list-group-item"><strong>Director :</strong>${m.Director} </li>
                <li class="list-group-item"><strong>Actor :</strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong><br> ${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>
    `;
}
