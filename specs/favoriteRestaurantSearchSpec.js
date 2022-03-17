import FavoriteRestaurantSearchPresenter
  from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching restaurants', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div id="movie-search-container">
            <input id="query" type="text">
            <div class="movie-result-container">
                <ul class="movies">
                </ul>
            </div>
        </div>
        `;
  });

  it('should be able to capture the query typed by the user', () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants');
    const presenter = new FavoriteRestaurantSearchPresenter({ 
      favoriteRestaurants: FavoriteRestaurantIdb 
    });

    const queryElement = document.getElementById('query');
    queryElement.value = 'restaurant a';
    queryElement.dispatchEvent(new Event('change'));

    expect(presenter.latesQuery)
      .toEqual('restaurant a');
  });

  it('should ask the model to search for liked restaurants', () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants');
    const presenter = new FavoriteRestaurantSearchPresenter({ 
      favoriteRestaurants: FavoriteRestaurantIdb 
    });

    const queryElement = document.getElementById('query');
    queryElement.value = 'restaurant a';
    queryElement.dispatchEvent(new Event('change'));

    expect(FavoriteRestaurantIdb.searchRestaurants)
      .toHaveBeenCalledWith('restaurant a');
  });
});
