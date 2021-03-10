import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(value: any[], refugeName: string, genre: string, age:string): unknown {

    if(!value) return null;

    if(refugeName == undefined) { refugeName = '' }
    if(genre == undefined) { genre = '' }
    if(age == undefined) { age = '' }

    if(refugeName != '' && genre != '' && age != '') {
      return value.filter(dog => 
        dog.refuge.name == refugeName && dog.genre == genre && this.filterAge(dog, age)
      );
    } else if(refugeName != '' && genre == '' && age != '') {
      return value.filter(dog => dog.refuge.name == refugeName && this.filterAge(dog, age));
    } else if(refugeName != '' && genre == '' && age == ''){
      return value.filter(dog => dog.refuge.name == refugeName);
    } else if (genre != '' && refugeName == '' && age != '') {
      return value.filter(dog => dog.genre == genre && this.filterAge(dog, age));
    } else if (genre != '' && refugeName == '' && age == '') {
      return value.filter(dog => dog.genre == genre);
    } else if (genre == '' && refugeName == '' && age != ''){
      return value.filter(dog => this.filterAge(dog, age));
    } else if (genre == '' && refugeName == '' && age != '') {
      return value.filter(dog =>  dog.refuge.name == refugeName && dog.genre == genre );
    } else {
      return value
    }
  }

  filterAge(dog: any, filterAge: string) {
    const dogAge = moment().diff(dog.age, 'years')
    const age = parseInt(filterAge)
    if(age == 11) {
      return dogAge >= 11
    } else {
      return dogAge == age
    }
  }
}
