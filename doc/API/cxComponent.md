The cxComponent class is a simple data holder. There should be no business logic in there. Is just stores the data that is required by the cxSystem to be processed/rendered.

When you write your own components be sure to extend this one and set is a appropriate tag to identify it later.

Example: 

    import {cxComponent} from 'complex-engine';

    module.exports =  class PhysicComponent extends cxComponent
    {
        /**
         * @param  {cxScript} script [description]
         */
        constructor ( x, y, w, h )
        {
            super()
            this.tag = 'physic';
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    }



# API 

## getTag() : String
returns the tag the component has
