// START 11TY imports
import eleventyNavigationPlugin             from "@11ty/eleventy-navigation";
import { InputPathToUrlTransformPlugin }    from "@11ty/eleventy";
import { eleventyImageTransformPlugin }     from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin }           from "@11ty/eleventy";
// END 11TY imports

// START LibDoc imports
import libdocConfig                         from "./_data/libdocConfig.js";
import libdocFunctions                      from "./_data/libdocFunctions.js";
// END LibDoc imports

export default function(eleventyConfig) {
    // START PLUGINS
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, libdocFunctions.pluginsParameters.eleventyImageTransform());
    // END PLUGINS

    // START FILTERS
    eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
    eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
    eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
    eleventyConfig.addAsyncFilter("dateString", libdocFunctions.filters.dateString);
    eleventyConfig.addAsyncFilter("datePrefixText", libdocFunctions.filters.datePrefixText);
    eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
    eleventyConfig.addAsyncFilter("sanitizeJSON", libdocFunctions.filters.sanitizeJson);
    eleventyConfig.addAsyncFilter("gitLastModifiedDate", libdocFunctions.filters.gitLastModifiedDate);
    // END FILTERS

    // START COLLECTIONS
    eleventyConfig.addCollection("series", function(collectionApi) {
        return collectionApi.getAll()
            .filter(function(item) {
                return item.data.eleventyNavigation
                    && item.data.eleventyNavigation.key
                    && !item.data.eleventyNavigation.parent;
            })
            .sort(function(a, b) {
                const aOrder = a.data.eleventyNavigation.order ?? 0;
                const bOrder = b.data.eleventyNavigation.order ?? 0;
                return aOrder - bOrder;
            });
    });
    // END COLLECTIONS

    // START SHORTCODES
    eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
    eleventyConfig.addPairedShortcode("alertAlt", libdocFunctions.shortcodes.alert);
    eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
    eleventyConfig.addShortcode("icons", libdocFunctions.shortcodes.icons);
    eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
    eleventyConfig.addShortcode("iconCard", libdocFunctions.shortcodes.iconCard);
    // END SHORTCODES

    // START FILE COPY
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("core/assets");
    eleventyConfig.addPassthroughCopy("favicon.png");
    // END FILE COPY
    
    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix
    }
};