import AppKit
import QuickLookThumbnailing

final class ThumbnailProvider: QLThumbnailProvider {
    override func provideThumbnail(for request: QLFileThumbnailRequest,
                                   _ handler: @escaping (QLThumbnailReply?, Error?) -> Void) {
        let size = CGSize(width: min(256, request.maximumSize.width),
                          height: min(256, request.maximumSize.height))
        let reply = QLThumbnailReply(contextSize: size, currentContextDrawing: {
            NSColor(calibratedRed: 0.12, green: 0.24, blue: 0.42, alpha: 1).setFill()
            NSBezierPath(rect: CGRect(origin: .zero, size: size)).fill()
            let attributes: [NSAttributedString.Key: Any] = [
                .font: NSFont.boldSystemFont(ofSize: max(6, min(size.width, size.height) / 12)),
                .foregroundColor: NSColor.white
            ]
            ("PEEK\nTHUMB" as NSString).draw(
                in: CGRect(x: size.width * 0.1, y: size.height * 0.2,
                           width: size.width * 0.8, height: size.height * 0.6),
                withAttributes: attributes)
            return true
        })
        handler(reply, nil)
    }
}
