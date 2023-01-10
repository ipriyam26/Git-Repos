import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [SearchComponent]
        });
        component = TestBed.get(SearchComponent);
        httpTestingController = TestBed.get(HttpTestingController);
    });
    
    it('should call the api and get user data when username is entered', () => {
        // Set up the mock http response
        const userData = {
            login: 'username',
            bio: 'user bio',
            location: 'user location',
            twitter_username: '',
            blog: '',
            repos_url: '',
            avatar_url: '',
        };

        // Set the component's username
        component.username = 'username';

        // Call the onSubmit method
        component.onSubmit();

        // Assert that a GET request was made to the correct URL
        const req = httpTestingController.expectOne('https://gitrepo2.onrender.com/users/username');
        expect(req.request.method).toEqual('GET');
        req.flush(userData);

        // Assert that the component's user property was set with the mock user data
        expect(component.user).toEqual(userData);
    });
    afterEach(() => {
        httpTestingController.verify();
    });
});
