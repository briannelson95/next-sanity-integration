/**
 * This plugin contains all the logic for stting up the 'Settings' singleton
*/

import { type DocumentDefinition, definePlugin } from "sanity";
import { type StructureResolver } from "sanity/desk";

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
    return {
        name: 'settings',
        document: {
            newDocumentOptions: (prev, { creationContext }) => {
                if (creationContext.type === 'global') {
                    return prev.filter((templateItem) => templateItem.templateId !== type)
                }

                return prev
            },
            actions: (prev, { schemaType }) => {
                if (schemaType === type) {
                    return prev.filter(({ action }) => action !== 'duplicate')
                }

                return prev
            },
        },
    }
})

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document instead of rending "Settings" in a list
// like how "Blog" and "Author" is handled
export const settingsStructure = (
    typeDef: DocumentDefinition
): StructureResolver => {
    return (S) => {
        const settingsListItem =
            S.listItem()
                .title(typeDef.title)
                .icon(typeDef.icon)
                .child(
                    S.editor()
                        .id(typeDef.name)
                        .schemaType(typeDef.name)
                        .documentId(typeDef.name)
                )
            
        const defaultListItems = S.documentTypeListItems().filter(
            (listItem) => listItem.getId() != typeDef.name
        )

        return S.list()
            .title('Content')
            .items([settingsListItem, S.divider(), ...defaultListItems])
    }
}