import Foundation
import UniformTypeIdentifiers

struct ProbeResult: Sendable {
    let typeIdentifier: String
    let byteCount: Int
    let accessDescription: String
}

enum FileProbe {
    // No parsing, logging, network, directory traversal, or source mutation.
    static func inspect(_ url: URL) -> ProbeResult {
        do {
            let metadata = try url.resourceValues(forKeys: [
                .contentTypeKey, .fileSizeKey, .isRegularFileKey, .isSymbolicLinkKey
            ])
            guard metadata.isRegularFile == true, metadata.isSymbolicLink != true else {
                return ProbeResult(typeIdentifier: metadata.contentType?.identifier ?? "unknown",
                                   byteCount: 0, accessDescription: "Skipped: not a regular file")
            }
            let handle = try FileHandle(forReadingFrom: url)
            defer { try? handle.close() }
            let prefix = try handle.read(upToCount: 32) ?? Data()
            return ProbeResult(typeIdentifier: metadata.contentType?.identifier ?? "unknown",
                               byteCount: metadata.fileSize ?? 0,
                               accessDescription: "Read access OK (\(prefix.count) bytes tested)")
        } catch {
            // Error descriptions may contain private file paths. Do not surface them.
            return ProbeResult(typeIdentifier: "unavailable", byteCount: 0,
                               accessDescription: "Metadata or read access failed")
        }
    }
}
