import { Component } from '@angular/core'

@Component({
  selector: 'agl-home',
  template: `

    <div class="ma0 tc page">

      <agl-header [selectedItem]="0"></agl-header>

      <agl-hero image="url('assets/img/hero-image.png')"
        title="Home Page"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum distinctio dolores, dolor autem maiores sequi a id aperiam, ratione esse!"
        button="Explore">
      </agl-hero>

      <agl-section>
        <h1 class="primary-text">Section 1</h1>
        <p class="mh5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta exercitationem consequatur culpa, assumenda quod iure quasi molestiae reprehenderit officiis eum iste hic voluptatibus repellat aliquam veritatis. Nam inventore aliquid cupiditate!</p>
        <agl-button>Read More</agl-button>
      </agl-section>

      <agl-section [light]="true" >
        <h1 class="primary-text">Section 2</h1>
        <p class="mh5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta exercitationem consequatur culpa, assumenda quod iure quasi molestiae reprehenderit officiis eum iste hic voluptatibus repellat aliquam veritatis. Nam inventore aliquid cupiditate!</p>
        <agl-button>Read More</agl-button>
      </agl-section>

      <agl-section>
        <h1 class="primary-text">Section 3</h1>
        <p class="mh5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta exercitationem consequatur culpa, assumenda quod iure quasi molestiae reprehenderit officiis eum iste hic voluptatibus repellat aliquam veritatis. Nam inventore aliquid cupiditate!</p>
        <agl-button>Read More</agl-button>
      </agl-section>

      <agl-footer></agl-footer>
    </div>
  `
})
export class HomePageComponent {

}