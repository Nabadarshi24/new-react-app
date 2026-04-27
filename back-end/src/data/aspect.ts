import { getuid } from "process";
import { v4 } from "uuid";

export interface IAspect {
  id: string  ;
  value: string;
  label: string;
  type: string;
};

export const aspects: IAspect[] = [
  {
    id: "category_top_wear",
    label: "Top Wear",
    value: "top_wear",
    type: "category"
  },
  {
    id: "category_bottom_wear",
    label: "Bottom Wear",
    value: "bottom_wear",
    type: "category"
  },
  {
    id: "gender_men",
    label: "Men",
    value: "men",
    type: "gender"
  },
  {
    id: "gender_women",
    label: "Women",
    value: "women",
    type: "gender"
  },
  {
    id: "color_red",
    label: "Red",
    value: "red",
    type: "color"
  },
  {
    id: "color_blue",
    label: "Blue",
    value: "blue",
    type: "color"
  },
  {
    id: "color_green",
    label: "Green",
    value: "green",
    type: "color"
  },
  {
    id: "color_yellow",
    label: "Yellow",
    value: "yellow",
    type: "color"
  },
  {
    id: "color_black",
    label: "Black",
    value: "black",
    type: "color"
  },
  {
    id: "color_white",
    label: "White",
    value: "white",
    type: "color"
  },
  {
    id: "color_pink",
    label: "Pink",
    value: "pink",
    type: "color"
  },
  {
    id: "color_purple",
    label: "Purple",
    value: "purple",
    type: "color"
  },
  {
    id: "color_orange",
    label: "Orange",
    value: "orange",
    type: "color"
  },
  {
    id: "size_xs",
    label: "XS",
    value: "xs",
    type: "size"
  },
  {
    id: "size_s",
    label: "S",
    value: "s",
    type: "size"
  },
  {
    id: "size_m",
    label: "M",
    value: "m",
    type: "size"
  },
  {
    id: "size_l",
    label: "L",
    value: "l",
    type: "size"
  },
  {
    id: "size_xl",
    label: "XL",
    value: "xl",
    type: "size"
  },
  {
    id: "size_xxl",
    label: "XXL",
    value: "xxl",
    type: "size"
  },
  {
    id: "material_cotton",
    label: "Cotton",
    value: "cotton",
    type: "material"
  },
  {
    id: "material_polyester",
    label: "Polyester",
    value: "polyester",
    type: "material"
  },
  {
    id: "material_silk",
    label: "Silk",
    value: "silk",
    type: "material"
  },
  {
    id: "material_wool",
    label: "Wool",
    value: "wool",
    type: "material"
  },
  {
    id: "material_denim",
    label: "Denim",
    value: "denim",
    type: "material"
  },
  {
    id: "material_linen",
    label: "Linen",
    value: "linen",
    type: "material"
  },
  {
    id: "brand_urban_threads",
    label: "Urban Threads",
    value: "urban_threads",
    type: "brand"
  },
  {
    id: "brand_modern_fit",
    label: "Modern Fit",
    value: "modern_fit",
    type: "brand"
  },
  {
    id: "brand_street_style",
    label: "Street Style",
    value: "street_style",
    type: "brand"
  },
  {
    id: "brand_beach_breeze",
    label: "Beach Breeze",
    value: "beach_breeze",
    type: "brand"
  },
  {
    id: "brand_fashionista",
    label: "Fashionista",
    value: "fashionista",
    type: "brand"
  },
  {
    id: "brand_polo_classics",
    label: "Polo Classics",
    value: "polo_classics",
    type: "brand"
  }
];