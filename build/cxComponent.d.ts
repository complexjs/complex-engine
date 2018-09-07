/**
 * This is a bare component.
 * It's used to store specific data related to an cxEntity. This data will then be processed by a cxSystem.
 */
export default abstract class cxComponent {
    abstract readonly tag: string;
}
